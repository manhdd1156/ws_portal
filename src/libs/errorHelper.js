import _ from 'lodash';
function parseLoginError(err) {
  let parsedError = {
    message: 'Đã có lỗi xảy ra',
  };
  if (err.response) {
    if (err.response.data && (err.response.status === 401 || err.response.status === 403)) {
      parsedError = {
        message: 'Sai tên đăng nhập hoặc mật khẩu',
      };
    } else if (err.response.status === 422) {
      parsedError = {
        message: 'Hãy điền tên đăng nhập và mật khẩu',
      };
    } else {
    }
  }
  return parsedError;
}
export function fieldErrorSelector(fieldName, errorList) {
  if (!errorList) {
    return false;
  }

  if (_.isArray(errorList)) {
    const field = errorList.find(f => f.fieldName === fieldName);

    if (field) {
      return true;
    }
  }

  return false;
}
export const errorParser = {
  parseLoginError,
};


export function apiError2Messages(apiError) {
  // console.log('apiError', apiError);
  try {
    const { status, data } = apiError;
    switch (status) {
      case 401:
      case 403:
      case 422: {
        let errorObject;

        // console.log('data', data);

        if (data && data.error) {
          errorObject = data.error;

          if (errorObject.errors) {
            errorObject = errorObject.errors;
          } else {
            return errorObject;
          }
        }

        if (errorObject) {
          const messages = [];

          Object.entries(errorObject).forEach(([name, value]) => {
            let message = '';

            switch (value.kind) {
              case 'required':
                message = 'system:msg.validate.required';
                break;

              default:
                message = 'system:msg.validate.failure';
                break;
            }

            messages.push({
              name,
              message,
            });
          });

          return messages;
        }
        if (data.message) {
          return data.message
        }
        return `system:msg.httpResponseCode.${status.toString()}`;
      }

      case 500: {
        const errorObject = data && data.error ? data.error : undefined;

        if (errorObject && errorObject.message) {
          return errorObject.message;
        }

        return `system:msg.httpResponseCode.${status.toString()}`;
      }

      default:
        console.log('default error')
        return `system:msg.httpResponseCode.${status.toString()}`;
    }
  } catch (error) {
    console.log('errorHelper>>apiError2Messages>>error :', error)
    return apiError;
  }
}
