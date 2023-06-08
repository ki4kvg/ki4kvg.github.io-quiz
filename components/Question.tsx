import { ArrowRightIcon, Checkbox, ConfirmIcon, IconButton, Pane, Text } from "evergreen-ui";
import styled from "styled-components";
import { TAnswer, TCheckedAnswer, TQuestion } from "@/types/types";
import { FC, useEffect, useState } from "react";

type TProps = {
    questions: TQuestion[],
    evaluateSolutions: (solutions: TCheckedAnswer[], setIsLoading: (a: boolean) => void) => void,
}
export const Question: FC<TProps> = ({questions, evaluateSolutions}) => {

    const [checkedAnswerID, setCheckedAnswerID] = useState<string>('')
    const [solutions, setSolutions] = useState<TCheckedAnswer[]>([])
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const questionsAmount = questions.length-1

    const setNewAnswer = () => {
        const answer: TCheckedAnswer = {
            question_id: questions[currentQuestionNumber].id,
            answer_id: checkedAnswerID,
        }
        setSolutions((prevState) => [...prevState, answer])
    }
    const handleNextQuestion = () => {
        if (currentQuestionNumber < questionsAmount) {
            setNewAnswer()
            setCurrentQuestionNumber((prevState) => prevState + 1)
            setCheckedAnswerID('')
        }
        if (currentQuestionNumber === questionsAmount && checkedAnswerID != '') {
            setIsLoading(true)
            evaluateSolutions(solutions, setIsLoading)
        }
    }

    useEffect(() => {
        if (currentQuestionNumber === questionsAmount && checkedAnswerID != '') {
            setNewAnswer()
        }
    }, [checkedAnswerID])

    return (
        <QuestionWrapper>
            <Text color="white"
                  fontSize="18px">{currentQuestionNumber + 1 + ". " + questions[currentQuestionNumber].question}</Text>
            <AnswerWrapper>
                {questions[currentQuestionNumber].answers.map((answer: TAnswer) => {
                    return (
                        <>
                            <Checkbox
                                id={answer.id}
                                label={<Text color="white" fontSize="16px">{answer.answer}</Text>}
                                checked={answer.id === checkedAnswerID}
                                onChange={() => setCheckedAnswerID(answer.id)}
                            />
                        </>
                    )
                })}
            </AnswerWrapper>
            <IconButton
                disabled={checkedAnswerID === '' || isLoading}
                size="large"
                icon={currentQuestionNumber === questionsAmount ? ConfirmIcon : ArrowRightIcon}
                onClick={handleNextQuestion}/>
        </QuestionWrapper>
    )
}

const QuestionWrapper = styled(Pane)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid whitesmoke;
  margin: 10px;
  border-radius: 10px;
  padding: 15px;
  min-width: 600px;
  min-height: 350px;
`;

const AnswerWrapper = styled(Pane)`
  display: flex;
  flex-direction: column;
  border: 1px solid whitesmoke;
  margin: 10px;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  min-height: 250px;
`;