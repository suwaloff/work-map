import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  const permissions = window.cordova.plugins.permissions;

  const permissionList = [
    permissions.READ_EXTERNAL_STORAGE,
    permissions.ACCESS_FINE_LOCATION,
    permissions.ACCESS_COARSE_LOCATION,
    permissions.MANAGE_EXTERNAL_STORAGE,
  ];

  permissions.hasPermission(permissionList, handlePermissionCheck);

  function handlePermissionCheck(status) {
    if (!status.hasPermission) {
      permissions.requestPermissions(
        permissionList,
        handlePermissionRequest,
        handlePermissionError
      );
    }
  }

  function handlePermissionRequest(status) {
    if (!status.hasPermission) {
      handlePermissionError(status);
    }
  }

  function handlePermissionError(error) {
    console.warn('Permissions error:', error);
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
