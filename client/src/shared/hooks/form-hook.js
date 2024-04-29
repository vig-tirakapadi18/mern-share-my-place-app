import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
    if (action.type === "INPUT_CHANGE") {
        let isFormValid = true;

        for (const inputId in state.inputs) {
            if (!state.inputs[inputId]) {
                continue;
            }

            if (inputId === action.inputId) {
                isFormValid = isFormValid && action.isValid;
            } else {
                isFormValid = isFormValid && state.inputs[inputId].isValid;
            }
        }

        return {
            ...state,
            inputs: {
                ...state.inputs,
                [action.inputId]: {
                    value: action.value,
                    isValid: action.isValid,
                },
            },
            isValid: isFormValid,
        };
    }

    if (action.type === "SET_DATA") {
        return {
            inputs: action.inputs,
            isValid: action.isFormValid
        };
    }

    return state;
};

export const useForm = (initialInputs, initialFormValidity) => {
    const [currentFormState, dispatchActions] = useReducer(
        formReducer,
        {
            inputs: initialInputs,
            isValid: initialFormValidity,
        }
    );

    const inputHandler = useCallback((id, value, isValid) => {
        dispatchActions({ type: "INPUT_CHANGE", value, isValid, inputId: id });
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatchActions({
            type: "SET_DATA",
            inputs: inputData,
            isFormValid: formValidity
        })
    }, []);

    return [currentFormState, inputHandler, setFormData];
};