import Joi from 'joi-browser';

// Define your validation schema using Joi
const schema = Joi.object({
    projectid: Joi.string().required().label('Project Id'),
    projectname: Joi.string().required().label('Project Name')
  });

  // Validation function
const validateForm = (data) => {
    const options = { abortEarly: false };
    const { error } = schema.validate(data, options);
    if (!error) return null;
  
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
  
    return errors;
  };

  export default validateForm;