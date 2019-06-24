import { notification } from 'antd';

const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description
    });
  };

export const successNotification = (message, description) => 
  openNotification('sucess', message, description);

export const infosNotification = (message, description) => 
  openNotification('info', message, description);

export const warningNotification = (message, description) => 
  openNotification('warning', message, description);

export const errorNotification = (message, description) => 
  openNotification('error', message, description);
