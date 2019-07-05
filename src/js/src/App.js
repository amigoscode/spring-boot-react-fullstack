import React, { Component, Fragment } from 'react';
import Container from './Container';
import Footer from './Footer';
import './App.css';
import {
   getAllStudents,
   updateStudent,
   deleteStudent
} from './client';
import AddStudentForm from './forms/AddStudentForm';
import EditStudentForm from './forms/EditStudentForm';
import { errorNotification } from './Notification';
import {
  Table,
  Avatar,
  Spin,
  Icon,
  Modal,
  Empty,
  PageHeader,
  Button,
  notification, 
  Popconfirm
} from 'antd';

const getIndicatorIcon = () => <Icon type="loading" style={{ fontSize: 24 }} spin />;

class App extends Component {

  state = {
    students: [],
    isFetching: false,
    selectedStudent: {},
    isAddStudentModalVisisble: false,
    isEditStudentModalVisible: false,
  }

  componentDidMount () {
    this.fetchStudents();
  }

  openAddStudentModal = () => this.setState({isAddStudentModalVisisble: true})

  closeAddStudentModal = () => this.setState({isAddStudentModalVisisble: false})

  openEditStudentModal = () => this.setState({ isEditStudentModalVisible: true })
  
  closeEditStudentModal = () => this.setState({ isEditStudentModalVisible: false })

  openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

  fetchStudents = () => {
    this.setState({
      isFetching: true
    });
    getAllStudents()
      .then(res => res.json()
      .then(students => {
        console.log(students);
        this.setState({
          students,
          isFetching: false
        });
      }))
      .catch(error => {
        console.log(error.error);
        const message = error.error.message;
        const description = error.error.error;
        errorNotification(message, description);
        this.setState({
          isFetching: false
        });
      });
  }

  editUser = selectedStudent => {
    this.setState({ selectedStudent });
    this.openEditStudentModal();
  }

  updateStudentFormSubmitter = student => {
    updateStudent(student.studentId, student).then(() => {
      this.openNotificationWithIcon('success', 'Student updated', `${student.studentId} was updated`);
      this.closeEditStudentModal();
      this.fetchStudents();
    }).catch(err => {
      console.error(err.error);
      this.openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }

  deleteStudent = studentId => {
    deleteStudent(studentId).then(() => {
      this.openNotificationWithIcon('success', 'Student deleted', `${studentId} was deleted`);
      this.fetchStudents();
    }).catch(err => {
      this.openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }

  render() {

    const { students, isFetching, isAddStudentModalVisisble } = this.state;

    const commonElements = () => (
      <div>
        <Modal
          title='Add new student'
          visible={isAddStudentModalVisisble}
          onOk={this.closeAddStudentModal}
          onCancel={this.closeAddStudentModal}
          width={1000}>
          <AddStudentForm 
            onSuccess={() => {
              this.closeAddStudentModal(); 
              this.fetchStudents();
            }}
            onFailure={(error) => {
              const message = error.error.message;
              const description = error.error.httpStatus;
              errorNotification(message, description);
            }}
          />
        </Modal>

        <Modal
          title='Edit'
          visible={this.state.isEditStudentModalVisible}
          onOk={this.closeEditStudentModal}
          onCancel={this.closeEditStudentModal}
          width={1000}>
          
          <PageHeader title={`${this.state.selectedStudent.studentId}`}/>
          
          <EditStudentForm 
            initialValues={this.state.selectedStudent} 
            submitter={this.updateStudentFormSubmitter}/>
        </Modal>

        <Footer
          numberOfStudents={students.length}
          handleAddStudentClickEvent={this.openAddStudentModal}
        />  
      </div>
    )

    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()}/>
        </Container>
      );
    }

    if (students && students.length) {
      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'Student Id',
          dataIndex: 'studentId',
          key: 'studentId'
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName'
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender'
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Fragment>
              <Popconfirm
                placement='topRight'
                title={`Are you sure to delete ${record.studentId}`} 
                onConfirm={() => this.deleteStudent(record.studentId)} okText='Yes' cancelText='No'
                onCancel={e => e.stopPropagation()}>
                <Button type='danger' onClick={(e) => e.stopPropagation()}>Delete</Button>
              </Popconfirm>
              <Button style={{marginLeft: '5px'}} type='primary' onClick={() => this.editUser(record)}>Edit</Button>
            </Fragment>
          ),
        }
      ];

      return (
        <Container>
          <Table 
            style={{marginBottom: '100px'}}
            dataSource={students} 
            columns={columns} 
            pagination={false}
            rowKey='studentId'/>
          {commonElements()}
        </Container>
      );

    }

    return (
      <Container>
        <Empty description={
          <h1>No Students found</h1>
        }/>
        {commonElements()}
      </Container>
    )
  }
}

export default App;
