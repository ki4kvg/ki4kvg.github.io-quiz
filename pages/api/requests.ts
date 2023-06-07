import { gql } from "@apollo/client";
export const GET_QUESTIONS = gql`
        query GetQuestions {
            questions {
                question
                id
                answers {
                  answer
                  id
                }
              }
    }`;