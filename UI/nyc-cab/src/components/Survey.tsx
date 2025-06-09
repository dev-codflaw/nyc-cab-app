import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { submitSurvey } from "../services/api"; // ✅ Using the API service!


const questions = [
    {
        id: 1,
        question: "What type of driver are you?",
        options: [
            "Yellow cab driver",
            "Green cab driver",
            "Black car/Livery driver",
            "Rideshare driver (Uber/Lyft)",
            "Owner-operator",
            "New or aspiring driver",
        ],
        type: "checkbox",
    },
    {
        id: 2,
        question: "How long have you been driving in NYC?",
        options: [
            "Less than 1 year",
            "1–3 years",
            "3–7 years",
            "7–15 years",
            "Over 15 years",
        ],
        type: "radio",
    },
    {
        id: 3,
        question: "How many hours do you usually drive in a day?",
        options: [
            "Less than 6 hours",
            "6–8 hours",
            "8–10 hours",
            "10+ hours",
        ],
        type: "radio",
    },
    {
        id: 4,
        question: "Which zones/areas do you usually cover?",
        options: ["Manhattan", "Brooklyn", "Bronx", "Queens", "Staten Island", "All city"],
        type: "dropdown",
    },
    {
        id: 5,
        question: "Do you feel the city listens to driver needs and feedback?",
        options: ["Yes", "Sometimes", "Rarely", "Never"],
        type: "radio",
    },
    {
        id: 6,
        question: "What is your average weekly earnings goal? (Optional)",
        type: "text",
    },
    {
        id: 7,
        question: "What challenges do you face most often as a taxi driver? (Select top 3)",
        options: [
            "Long hours with low income",
            "Unfair passenger behavior",
            "No real-time route optimization",
            "Lack of driver coordination",
            "Rising expenses (gas, maintenance)",
            "No platform to share my voice or opinions",
            "Poor public image of drivers",
            "Other",
        ],
        type: "checkbox",
    },
    {
        id: 8,
        question: "What do you believe would improve your earnings the most?",
        type: "text",
    },
    {
        id: 9,
        question: "What advice would you give to new or young drivers joining this business?",
        type: "text",
    },
    {
        id: 10,
        question: "If we built a smart community app for drivers, what features would you want first?",
        options: [
            "Smart route suggestions",
            "Fare prediction/earning estimator",
            "Events & alerts (closures, protests, traffic)",
            "Trusted rest spots and gas stations",
            "Driver forum / group chat",
            "Legal or financial help",
            "Other",
        ],
        type: "checkbox",
    },
];

export default function Survey() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<any[]>([]);
    const [startTime, setStartTime] = useState(Date.now());
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleNext = (answer: any) => {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const questionId = questions[currentStep].id;

        setAnswers((prev) => [
            ...prev,
            { questionId, answer: answer || "No answer", timeTaken },
        ]);
        setStartTime(Date.now());

        if (currentStep + 1 === questions.length) {
            submitSurveyData();
        } else {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const submitSurveyData = async () => {
        try {
            const res = await submitSurvey({ surveyAnswers: answers }, token!);
            if (res.success) {
                toast.success("Survey submitted! Thank you.");
                navigate("/home");
            } else {
                toast.error(res.message || "Failed to submit survey.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error submitting survey.");
        }
    };

    const currentQuestion = questions[currentStep];
    const [inputValue, setInputValue] = useState<string | string[]>("");

    useEffect(() => {
        setInputValue("");
        setStartTime(Date.now());
    }, [currentStep]);

    const renderQuestion = () => {
        switch (currentQuestion.type) {
            case "radio":
                return currentQuestion.options.map((opt) => (
                    <label key={opt} className="flex items-center mb-2">
                        <input
                            type="radio"
                            name={`q${currentQuestion.id}`}
                            value={opt}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <span className="ml-2">{opt}</span>
                    </label>
                ));
            case "checkbox":
                return currentQuestion.options.map((opt) => (
                    <label key={opt} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            value={opt}
                            checked={(inputValue as string[]).includes(opt)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setInputValue([...(inputValue as string[]), opt]);
                                } else {
                                    setInputValue(
                                        (inputValue as string[]).filter((v) => v !== opt)
                                    );
                                }
                            }}
                        />
                        <span className="ml-2">{opt}</span>
                    </label>
                ));
            case "dropdown":
                return (
                    <select
                        value={inputValue as string}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="border p-3 rounded w-full"
                    >
                        <option value="">Select an option</option>
                        {currentQuestion.options.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                );
            case "text":
                return (
                    <textarea
                        value={inputValue as string}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="border p-3 rounded w-full"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col p-4 min-h-screen">
            <h2 className="text-lg font-semibold mb-4">{currentQuestion.question}</h2>
            {renderQuestion()}
            <button
                onClick={() => handleNext(inputValue)}
                className="bg-black text-white p-3 rounded mt-4"
            >
                {currentStep + 1 === questions.length ? "Submit" : "Next"}
            </button>
        </div>
    );
}
