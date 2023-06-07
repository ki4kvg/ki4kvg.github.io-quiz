import { useQuery } from "@apollo/client";
import { Pane, Spinner } from "evergreen-ui";
import { TBody, TCheckedAnswer, TErrorMessage, TEvaluateData } from "@/types/types";
import { Question } from "@/components/Question";
import styled from "styled-components";
import { useState } from "react";
import { nhost } from "@/pages/_app";
import { useRouter } from "next/router";
import { Routes } from "@/routes/routes";
import { GET_QUESTIONS } from "@/pages/api/requests";


export default function Home() {
    const {loading, data} = useQuery(GET_QUESTIONS)
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0)
    const [solutions, setSolutions] = useState<TCheckedAnswer[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    const localScore = JSON.parse(localStorage.getItem("score") || '[]');
    const evaluateSolutions = async () => {
        const {res} = await nhost.functions.call<TEvaluateData, TBody, TErrorMessage>(
            '/evaluate',
            {solutions}
        )
        const newScore = localScore.concat(res?.data.score)
        res?.data && localStorage.setItem("score", JSON.stringify(newScore))
        router.push(`${Routes.MAIN_PAGE}`)
        setIsLoading(false)
    }

    console.log(solutions)
    return (
        <Wrapper>
            {loading ?
                <Spinner/>
                :
                <Question
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    question={data.questions[currentQuestionNumber]}
                    currentQuestionNumber={currentQuestionNumber}
                    setCurrentQuestionNumber={setCurrentQuestionNumber}
                    setAnswers={setSolutions}
                    evaluateSolutions={evaluateSolutions}/>
            }
        </Wrapper>
    )
}

const Wrapper = styled(Pane)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


