export type TQuestion = {
    id: string,
    question: String,
    answers: [TAnswer]
}

export type TAnswer = {
    id: string,
    answer: string,
}

export type TCheckedAnswer = {
    question_id: string,
    answer_id: string
}

export type TEvaluateData = {
    score: string
}

export type TBody = {
    solutions: TCheckedAnswer[]
}

export type TErrorMessage = {
    details: string
}
