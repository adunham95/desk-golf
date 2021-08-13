// https://medium.com/swlh/server-side-graphql-with-apollo-nextjs-part-1-setup-2615410c4966
import { gql } from '@apollo/client';

export const GET_COURSES = gql`
  query getCourses{
  getCourses{
    id
    name
    holes
  }
}
`;

export const CREATE_COURSE = gql`
  mutation createCourse($name:String!,$holes:Int){
  createCourse(name:$name, holes:$holes){
    id
    name
    holes
  }
}
`;
