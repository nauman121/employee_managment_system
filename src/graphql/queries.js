/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
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
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        attendences {
          nextToken
        }
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLeave = /* GraphQL */ `
  query GetLeave($id: ID!) {
    getLeave(id: $id) {
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
        attendences {
          nextToken
        }
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listLeaves = /* GraphQL */ `
  query ListLeaves(
    $filter: ModelLeaveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeaves(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getJob = /* GraphQL */ `
  query GetJob($id: ID!) {
    getJob(id: $id) {
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
        attendences {
          nextToken
        }
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEvaluation = /* GraphQL */ `
  query GetEvaluation($id: ID!) {
    getEvaluation(id: $id) {
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
        attendences {
          nextToken
        }
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listEvaluations = /* GraphQL */ `
  query ListEvaluations(
    $filter: ModelEvaluationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvaluations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWarning = /* GraphQL */ `
  query GetWarning($id: ID!) {
    getWarning(id: $id) {
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
        attendences {
          nextToken
        }
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listWarnings = /* GraphQL */ `
  query ListWarnings(
    $filter: ModelWarningFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWarnings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAttendence = /* GraphQL */ `
  query GetAttendence($id: ID!) {
    getAttendence(id: $id) {
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
        attendences {
          nextToken
        }
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAttendences = /* GraphQL */ `
  query ListAttendences(
    $filter: ModelAttendenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttendences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
