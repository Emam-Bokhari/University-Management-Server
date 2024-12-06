import { TErrorSource, TGenericErrorResponse } from '../interface/error';

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extracedMessage = match && match[1];

  const errorSources: TErrorSource = [
    {
      path: '',
      message: `${extracedMessage} is already exist!`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Key Error: Conflict with an existing entry.',
    errorSources,
  };
};
