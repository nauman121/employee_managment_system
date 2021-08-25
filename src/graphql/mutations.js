/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      employee_id
      employee_name
      full_name
      father_name
      cnic
      employee_addr
      employee_email
      employee_phone1
      employee_phone2
      employee_pic
      employee_salary
      role
      supervisor
      company
      blood_group
      transport_mode
      vichel_no
      dob
      doj
      status
      end_date
      last_degree
      institute
      leaves {
        items {
          id
          employee_id
          supervisor
          leave
          from
          to
          Lead_Approval
          Hr_Approval
          remarks
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      jobs {
        items {
          id
          employee_id
          organization
          start_date
          end_date
          designation
          createdAt
          updatedAt
        }
        nextToken
      }
      evaluation {
        items {
          id
          employee_id
          reviewer_name
          reviewer_title
          employee_name
          reviewing_date
          q_one
          q_two
          q_three
          q_four
          q_five
          q_six
          q_seven
          q_eight
          q_nine
          q_ten
          q_eleven
          q_twelve
          q_thirteen
          q_fourteen
          q_fifteen
          q_sixteen
          q_seventeen
          q_eighteen
          q_nineteen
          q_twenty
          q_twentyone
          q_twentytwo
          createdAt
          updatedAt
        }
        nextToken
      }
      warnings {
        items {
          id
          employee_id
          date
          type
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      attendences {
        items {
          id
          employee_id
          date
          in_time
          out_time
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
      id
      employee_id
      employee_name
      full_name
      father_name
      cnic
      employee_addr
      employee_email
      employee_phone1
      employee_phone2
      employee_pic
      employee_salary
      role
      supervisor
      company
      blood_group
      transport_mode
      vichel_no
      dob
      doj
      status
      end_date
      last_degree
      institute
      leaves {
        items {
          id
          employee_id
          supervisor
          leave
          from
          to
          Lead_Approval
          Hr_Approval
          remarks
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      jobs {
        items {
          id
          employee_id
          organization
          start_date
          end_date
          designation
          createdAt
          updatedAt
        }
        nextToken
      }
      evaluation {
        items {
          id
          employee_id
          reviewer_name
          reviewer_title
          employee_name
          reviewing_date
          q_one
          q_two
          q_three
          q_four
          q_five
          q_six
          q_seven
          q_eight
          q_nine
          q_ten
          q_eleven
          q_twelve
          q_thirteen
          q_fourteen
          q_fifteen
          q_sixteen
          q_seventeen
          q_eighteen
          q_nineteen
          q_twenty
          q_twentyone
          q_twentytwo
          createdAt
          updatedAt
        }
        nextToken
      }
      warnings {
        items {
          id
          employee_id
          date
          type
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      attendences {
        items {
          id
          employee_id
          date
          in_time
          out_time
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
      id
      employee_id
      employee_name
      full_name
      father_name
      cnic
      employee_addr
      employee_email
      employee_phone1
      employee_phone2
      employee_pic
      employee_salary
      role
      supervisor
      company
      blood_group
      transport_mode
      vichel_no
      dob
      doj
      status
      end_date
      last_degree
      institute
      leaves {
        items {
          id
          employee_id
          supervisor
          leave
          from
          to
          Lead_Approval
          Hr_Approval
          remarks
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      jobs {
        items {
          id
          employee_id
          organization
          start_date
          end_date
          designation
          createdAt
          updatedAt
        }
        nextToken
      }
      evaluation {
        items {
          id
          employee_id
          reviewer_name
          reviewer_title
          employee_name
          reviewing_date
          q_one
          q_two
          q_three
          q_four
          q_five
          q_six
          q_seven
          q_eight
          q_nine
          q_ten
          q_eleven
          q_twelve
          q_thirteen
          q_fourteen
          q_fifteen
          q_sixteen
          q_seventeen
          q_eighteen
          q_nineteen
          q_twenty
          q_twentyone
          q_twentytwo
          createdAt
          updatedAt
        }
        nextToken
      }
      warnings {
        items {
          id
          employee_id
          date
          type
          description
          createdAt
          updatedAt
        }
        nextToken
      }
       attendences {
        items {
          id
          employee_id
          date
          in_time
          out_time
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createLeave = /* GraphQL */ `
  mutation CreateLeave(
    $input: CreateLeaveInput!
    $condition: ModelLeaveConditionInput
  ) {
    createLeave(input: $input, condition: $condition) {
      id
      employee_id
      supervisor
      leave
      from
      to
      Lead_Approval
      Hr_Approval
      remarks
      type
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        attendences {
          nextToken
        }
        jobs {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateLeave = /* GraphQL */ `
  mutation UpdateLeave(
    $input: UpdateLeaveInput!
    $condition: ModelLeaveConditionInput
  ) {
    updateLeave(input: $input, condition: $condition) {
      id
      employee_id
      supervisor
      leave
      from
      to
      Lead_Approval
      Hr_Approval
      remarks
      type
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        jobs {
          nextToken
        }
        attendences {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteLeave = /* GraphQL */ `
  mutation DeleteLeave(
    $input: DeleteLeaveInput!
    $condition: ModelLeaveConditionInput
  ) {
    deleteLeave(input: $input, condition: $condition) {
      id
      employee_id
      supervisor
      leave
      from
      to
      Lead_Approval
      Hr_Approval
      remarks
      type
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        jobs {
          nextToken
        }
        attendences {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createJob = /* GraphQL */ `
  mutation CreateJob(
    $input: CreateJobInput!
    $condition: ModelJobConditionInput
  ) {
    createJob(input: $input, condition: $condition) {
      id
      employee_id
      organization
      start_date
      end_date
      designation
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        attendences {
          nextToken
        }
        jobs {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateJob = /* GraphQL */ `
  mutation UpdateJob(
    $input: UpdateJobInput!
    $condition: ModelJobConditionInput
  ) {
    updateJob(input: $input, condition: $condition) {
      id
      employee_id
      organization
      start_date
      end_date
      designation
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        attendences {
          nextToken
        }
        jobs {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteJob = /* GraphQL */ `
  mutation DeleteJob(
    $input: DeleteJobInput!
    $condition: ModelJobConditionInput
  ) {
    deleteJob(input: $input, condition: $condition) {
      id
      employee_id
      organization
      start_date
      end_date
      designation
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        attendences {
          nextToken
        }
        jobs {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createEvaluation = /* GraphQL */ `
  mutation CreateEvaluation(
    $input: CreateEvaluationInput!
    $condition: ModelEvaluationConditionInput
  ) {
    createEvaluation(input: $input, condition: $condition) {
      id
      employee_id
      reviewer_name
      reviewer_title
      employee_name
      reviewing_date
      q_one
      q_two
      q_three
      q_four
      q_five
      q_six
      q_seven
      q_eight
      q_nine
      q_ten
      q_eleven
      q_twelve
      q_thirteen
      q_fourteen
      q_fifteen
      q_sixteen
      q_seventeen
      q_eighteen
      q_nineteen
      q_twenty
      q_twentyone
      q_twentytwo
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        attendences {
          nextToken
        }
        jobs {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateEvaluation = /* GraphQL */ `
  mutation UpdateEvaluation(
    $input: UpdateEvaluationInput!
    $condition: ModelEvaluationConditionInput
  ) {
    updateEvaluation(input: $input, condition: $condition) {
      id
      employee_id
      reviewer_name
      reviewer_title
      employee_name
      reviewing_date
      q_one
      q_two
      q_three
      q_four
      q_five
      q_six
      q_seven
      q_eight
      q_nine
      q_ten
      q_eleven
      q_twelve
      q_thirteen
      q_fourteen
      q_fifteen
      q_sixteen
      q_seventeen
      q_eighteen
      q_nineteen
      q_twenty
      q_twentyone
      q_twentytwo
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        jobs {
          nextToken
        }
        attendences {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteEvaluation = /* GraphQL */ `
  mutation DeleteEvaluation(
    $input: DeleteEvaluationInput!
    $condition: ModelEvaluationConditionInput
  ) {
    deleteEvaluation(input: $input, condition: $condition) {
      id
      employee_id
      reviewer_name
      reviewer_title
      employee_name
      reviewing_date
      q_one
      q_two
      q_three
      q_four
      q_five
      q_six
      q_seven
      q_eight
      q_nine
      q_ten
      q_eleven
      q_twelve
      q_thirteen
      q_fourteen
      q_fifteen
      q_sixteen
      q_seventeen
      q_eighteen
      q_nineteen
      q_twenty
      q_twentyone
      q_twentytwo
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        jobs {
          nextToken
        }
        attendences {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createWarning = /* GraphQL */ `
  mutation CreateWarning(
    $input: CreateWarningInput!
    $condition: ModelWarningConditionInput
  ) {
    createWarning(input: $input, condition: $condition) {
      id
      employee_id
      date
      type
      description
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        jobs {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        attendences {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateWarning = /* GraphQL */ `
  mutation UpdateWarning(
    $input: UpdateWarningInput!
    $condition: ModelWarningConditionInput
  ) {
    updateWarning(input: $input, condition: $condition) {
      id
      employee_id
      date
      type
      description
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        jobs {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        attendences {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteWarning = /* GraphQL */ `
  mutation DeleteWarning(
    $input: DeleteWarningInput!
    $condition: ModelWarningConditionInput
  ) {
    deleteWarning(input: $input, condition: $condition) {
      id
      employee_id
      date
      type
      description
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        jobs {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        attendences {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createAttendence = /* GraphQL */ `
  mutation CreateAttendence(
    $input: CreateAttendenceInput!
    $condition: ModelAttendenceConditionInput
  ) {
    createAttendence(input: $input, condition: $condition) {
      id
      employee_id
      date
      in_time
      out_time
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        attendences{
          nextToken
        }
        jobs {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAttendence = /* GraphQL */ `
  mutation UpdateAttendence(
    $input: UpdateAttendenceInput!
    $condition: ModelAttendenceConditionInput
  ) {
    updateAttendence(input: $input, condition: $condition) {
      id
      employee_id
      date
      in_time
      out_time
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        jobs {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        attendences {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAttendence = /* GraphQL */ `
  mutation DeleteAttendence(
    $input: DeleteAttendenceInput!
    $condition: ModelAttendenceConditionInput
  ) {
    deleteAttendence(input: $input, condition: $condition) {
      id
      employee_id
      date
      in_time
      out_time
      employee {
        id
        employee_id
        employee_name
        full_name
        father_name
        cnic
        employee_addr
        employee_email
        employee_phone1
        employee_phone2
        employee_pic
        employee_salary
        role
        supervisor
        company
        blood_group
        transport_mode
        vichel_no
        dob
        doj
        status
        end_date
        last_degree
        institute
        leaves {
          nextToken
        }
        jobs {
          nextToken
        }
        evaluation {
          nextToken
        }
        warnings {
          nextToken
        }
        attendences {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;