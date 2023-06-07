import { ArrowRightIcon, Checkbox, ConfirmIcon, IconButton, Pane, Text } from "evergreen-ui";
import styled from "styled-components";
import { TAnswer, TCheckedAnswer, TQuestion } from "@/types/types";
import { FC, useEffect, useState } from "react";

type TProps = {
    question: TQuestion,
    currentQuestionNumber: number,
    setCurrentQuestionNumber: (cb: (a: number) => number) => void,
    setAnswers: (cb: (prevState: TCheckedAnswer[] | []) => TCheckedAnswer[]) => void,
    evaluateSolutions: () => void,
    setIsLoading: (a: boolean) => void,
    isLoading: boolean,
}
export const Question: FC<TProps> = ({
                                         question,
                                         currentQuestionNumber,
                                         setCurrentQuestionNumber,
                                         setAnswers,
                                         evaluateSolutions,
                                         setIsLoading,
                                         isLoading
                                     }) => {

    const [checkedAnswerID, setCheckedAnswerID] = useState<string>('')
    const setNewAnswer = () => {
        const answer: TCheckedAnswer = {
            question_id: question.id,
            answer_id: checkedAnswerID,
        }
        setAnswers((prevState) => [...prevState, answer])
    }
    const handleNextQuestion = () => {
        if (currentQuestionNumber < 6) {
            setNewAnswer()
            setCurrentQuestionNumber((prevState) => prevState + 1)
            setCheckedAnswerID('')
        }
        if (currentQuestionNumber === 6 && checkedAnswerID != '') {
             setIsLoading(true)
             evaluateSolutions()
        }
    }

    useEffect(()=> {
        if (currentQuestionNumber === 6 && checkedAnswerID != ''){
            setNewAnswer()
        }
    }, [checkedAnswerID])

    return (
        <QuestionWrapper>
            <Text color="white" fontSize="18px">{currentQuestionNumber+1 + ". " + question.question}</Text>
            <AnswerWrapper>
                {question.answers.map((answer: TAnswer) => {
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
                icon={currentQuestionNumber === 6 ? ConfirmIcon : ArrowRightIcon}
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