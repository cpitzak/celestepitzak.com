import { useState } from "react";
import { styled } from '@mui/material/styles';
import { TextField, Button, Typography } from "@mui/material";
import { CONTACT_ID } from "../../App";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const FormContainer = styled('div')(({ theme }) => ({
    maxWidth: '400px',
    margin: 'auto',
}));

const StyledForm = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
}));

const SubmitButton = styled(Button)`
  align-self: flex-start;
`;

export default function Contact({ sectionId }) {
    const [result, setResult] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");

    const onHCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
        formData.append("h-captcha-response", captchaToken);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div id={sectionId}>
            <FormContainer>
                <Typography variant="h5" gutterBottom>Commission Request Form</Typography>
                <StyledForm onSubmit={onSubmit}>
                    <TextField label="Name" name="name" variant="outlined" required />
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        required
                        type="email"
                    />
                    <TextField
                        label="Message"
                        name="message"
                        variant="outlined"
                        multiline
                        required
                        rows={4}
                    />
                    <HCaptcha
                        theme={"dark"}
                        sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                        onVerify={onHCaptchaChange}
                    />
                    <SubmitButton type="submit" variant="contained" color="primary">
                        Submit
                    </SubmitButton>
                </StyledForm>
                <Typography>{result}</Typography>
            </FormContainer>
        </div>
    );
}
