import React, { Component } from 'react';
import Container from './Container';
import Footer from './Footer';
import './App.css';
import { getAllStudents } from './client';
import AddStudentForm from './forms/AddStudentForm';
import { errorNotification } from './Notification';
import {
  Table,
  Avatar,
  Spin,
  Icon,
  Modal,
  Empty
} from 'antd';

const getIndicatorIcon = () => <Icon type="loading" style={{ fontSize: 24 }} spin />;


class App extends Component {

  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisisble: false
  }

  componentDidMount () {
    this.fetchStudents();
  }

  openAddStudentModal = () => this.setState({isAddStudentModalVisisble: true})

  closeAddStudentModal = () => this.setState({isAddStudentModalVisisble: false})

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
        <Footer
         numberOfStudents={students.length}
         handleAddStudentClickEvent={this.openAddStudentModal}/>  
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
