import { useQuery } from "@apollo/client";
import { Pane, Spinner } from "evergreen-ui";
import { TBody, TCheckedAnswer, TErrorMessage, TEvaluateData } from "@/types/types";
import { Question } from "@/components/Question";
import styled from "styled-components";
import { nhostClient } from "@/pages/_app";
import { useRouter } from "next/router";
import { Routes } from "@/routes/routes";
import { GET_QUESTIONS } from "@/pages/api/requests";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Home() {
    const {loading, data} = useQuery(GET_QUESTIONS)
    const router = useRouter();

    const localScore = useLocalStorage("score")
    const evaluateSolutions = async (solutions: TCheckedAnswer[], setIsLoading: (a: boolean) => void) => {
        const {res} = await nhostClient.functions.call<TEvaluateData, TBody, TErrorMessage>(
            '/evaluate',
            {solutions}
        )
        const newScore = res?.data && localScore.concat(res?.data.score)
        res?.data && localStorage.setItem("score", JSON.stringify(newScore))
        router.push(`${Routes.MAIN_PAGE}`)
        setIsLoading(false)
    }

    return (
        <Wrapper>
            {loading ?
                <Spinner/>
                :
                <Question
                    questions={data.questions}
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


