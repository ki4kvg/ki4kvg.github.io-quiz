import { ArrowRightIcon, Checkbox, ConfirmIcon, IconButton, Pane, Text } from "evergreen-ui";
import styled from "styled-components";
import { TAnswer, TCheckedAnswer, TQuestion } from "@/types/types";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

type TProps = {
    questions: TQuestion[],
    evaluateSolutions: (solutions: TCheckedAnswer[], setIsLoading: (a: boolean) => void) => void,
}
export const Question: FC<TProps> = ({questions, evaluateSolutions}) => {

    const [checkedAnswerID, setCheckedAnswerID] = useState('')
    const [solutions, setSolutions] = useState<TCheckedAnswer[]>([])
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const answer = useMemo(
        () => ({
            question_id: questions[currentQuestionNumber]?.id || '',
            answer_id: checkedAnswerID,
        }),
        [currentQuestionNumber, checkedAnswerID]
    );

    const setNewAnswer = useCallback(() => {
        setSolutions(prevState => [...prevState, answer]);
    }, [answer]);

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionNumber < questions.length-1) {
            setNewAnswer();
            setCurrentQuestionNumber((prevState) => prevState + 1);
            setCheckedAnswerID('');
        }
        if (currentQuestionNumber === questions.length-1 && checkedAnswerID !== '') {
            setIsLoading(true);
            evaluateSolutions(solutions, setIsLoading);
        }
    }, [currentQuestionNumber, checkedAnswerID, setNewAnswer, solutions]);

    useEffect(() => {
        if (currentQuestionNumber === questions.length-1 && checkedAnswerID !== '') {
            setNewAnswer();
        }
    }, [currentQuestionNumber, checkedAnswerID, setNewAnswer]);

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
                icon={currentQuestionNumber === questions.length-1 ? ConfirmIcon : ArrowRightIcon}
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