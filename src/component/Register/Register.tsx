import React from "react";
import "../../App.css";
const INITIAL_FORM_STATE: {
    firstname: string;
    lastname: string;
    phonenumber: number | string;
    country: string;
} = {
    firstname: "",
    lastname: "",
    phonenumber: 0,
    country: ""
};

const COUNTRIES = ["", 'India', "USA", "Canada", "China"];

const isAnagram = (key1: string, key2: string) => {
    const splitted = key1.split("");
    return splitted.every(ele => key2.includes(ele));
};

const validateName = (name: string) => {
    return name.trimStart().trimEnd().length < 6;
};
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const validateform = (formState: typeof INITIAL_FORM_STATE) => {
    const { firstname, lastname, phonenumber } = formState;
    return {
        firstname: validateName(firstname) ? "Please Enter First Name greater than 5" : "",
        lastname: validateName(lastname) ? "Please Enter Last Name greater than 5" : "",
        phonenumber: !phoneRegex.test(phonenumber.toString()) ? 
        "Please Enter Proper Phone Number with 10 length" : 0
    }
}

const Register = () => {
    const [formState, setFormState] = React.useState<typeof INITIAL_FORM_STATE>(INITIAL_FORM_STATE);
    const [formErrorState, setFormErrorState] = React.useState<typeof INITIAL_FORM_STATE>(INITIAL_FORM_STATE);
    const [anagram, setAnagram] = React.useState<Boolean>(false);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const errors = validateform(formState);
        const isError = Object.values(errors).every((error) => !Boolean(error));
        if (!isError) {
            setFormErrorState({ ...errors, country: "" });
        }
        else {
            setFormErrorState(INITIAL_FORM_STATE);
            alert("FORM SUBMITTED SUCCESFULLY");
        }
    };

    const checkAnagram = () => {
        setAnagram(isAnagram(formState.firstname, formState.lastname))
    };

    const clear = ()=> {
        setFormState(INITIAL_FORM_STATE);
        setFormErrorState(INITIAL_FORM_STATE);
        setAnagram(false);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <div className="mb-1">First Name : </div>
                            <input type='text' value={formState.firstname} onChange={handleChange} name="firstname" placeholder="Please Enter First Name" required className="mb-1" />
                            <ErrorMsg errorMsg={formErrorState.firstname} />
                        </label>
                        <label>
                            Last Name
                            <input type="text" value={formState.lastname} onChange={handleChange} name="lastname" placeholder="Please Enter Lasy Name" required />
                            <ErrorMsg errorMsg={formErrorState.lastname} />
                        </label>
                        <label>
                            Phone Number:
                            <input type="number" value={formState.phonenumber} onChange={handleChange} name="phonenumber" placeholder="Please Enter Phone Number" required />
                            <ErrorMsg errorMsg={formErrorState.phonenumber} />
                        </label>
                        <label>
                            Country:
                            <select value={formState.country} onChange={handleChange} name="country" placeholder="Please Enter Country" required>
                                {
                                    COUNTRIES.map((country) =>
                                        <option key={country} value={country.toLocaleLowerCase()}>{country}</option>
                                    )
                                }
                            </select>
                            <ErrorMsg errorMsg={formErrorState.country} />
                        </label>
                        <button type="submit" value="submit">Register</button>
                    </form>

                </div>
                    {
                        !Object.values(formState).every((error) => !Boolean(error)) &&
                        <>
                        <div className="row" style={{ marginTop : '5px'}}>
                            <button onClick={checkAnagram}>
                                Check if Anagram in first name and last name
                            </button>
                            {
                                anagram && <span>Found Anagram i.e {formState.firstname} - {formState.lastname} </span>
                            }
                        </div>
                        <div className="row">
                            <button onClick={clear}>Reset</button>
                        </div>
                        </>
                    }
            </div>
        </>
    )
};

const ErrorMsg = ({ errorMsg }: { errorMsg: string | number }) => {
    return errorMsg ? <span className="error-msg">{errorMsg}</span> : null
}

export default Register;