import Joi from 'joi-browser';

// Define your validation schema using Joi
const schema = Joi.object({
    issueName: Joi.string().required().label('Name'),
    moduleName: Joi.string().min(6).required().label('Module Name'),
    summary: Joi.string().required().min(30).max(300).label('Summary'),
    identfiedemp : Joi.string().required().label('Identfied Demp'),
    // dateidentified: Joi.date().iso().required().label('Date Identified'),
    targetdate: Joi.date().iso().required().label('Target Date'),
    progressreport: Joi.string().required().label('Progress Report'),
    stepsToReproduce: Joi.string().required().label('Steps To Reproduce'),
    description: Joi.string().required().min(30).max(300).label('Description'),
    iterationNumber: Joi.number().integer().positive().required().label('Iteration Number'),
    // // projectName: Joi.string().required().label('Project Name'),
    // assignTo: Joi.number().optional().integer().allow(null),
    // images: Joi.string().allow(null,''),
    // issueType: Joi.string().allow('Defect','Bug'),
    // linkToPast:Joi.allow(null),
    // priority: Joi.string().allow('Low','Medium','High'),
    // projectId: Joi.number().optional().integer().allow(null),
    // projectName: Joi.string().allow(null,''),
    // status:Joi.string().allow('Open','Close','In Progress','Hold'),
    // testingType:Joi.string().allow('Smoke Testing','Regression Testing'),
  });

  // Validation function
const validateForm = (data) => {
    const options = { abortEarly: false };
    const { error } = schema.validate(data, options);
    if (!error) return null;
    console.log("data in validation form",data);
  
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
  
    return errors;
  };

  export default validateForm;