import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useRouter } from "next/router";
import MuiButton from "../components/MuiButton";
import { auth, signInWithEmailAndPassword } from "../db/firebaseConfig";

const LoginContainer = React.memo(()=>{
    const router = useRouter();
    const [values, setValues] = React.useState({email:"",password:""});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({open:false,message:""});
    const handleChange = React.useCallback((event)=>{
        setValues({...values,[event.target.name]:event.target.value});
    },[values]);

    const handleLogin = async () => {
        try{
        // login user and redirect
        setLoading(true);
        const res =  await signInWithEmailAndPassword(auth, values.email, values.password);
        if(res){
            window?.localStorage.setItem("uid", res?.user?.uid);
            window?.localStorage.setItem("expiryTime", res?.user?.stsTokenManager.expirationTime);
            router.push("/");
            setLoading(false);
            setValues({email:"",password:""});
            setError({open:false,message:""});
            return false;
        }
        setLoading(false);
        }catch(e){
            setError({open:true,message:e.message});
            setValues({email:"",password:""});
            setLoading(false);
            console.log("AN ERROR OCCURED", e);
        }
    }
    return (
        <>
            {
                error.open && (
                    <>
                        <Alert variant="filled" severity="error" onClose={() => setError({open:false,message:""})}>{error.message}</Alert>
                    </>
                )
            }
            <Grid sx={{height:"100%"}} container alignItems="center" justifyContent="center" wrap="nowrap" direction="column">
                <Grid container alignItems="center" justifyContent="center" wrap="nowrap" direction="column">
                    <Typography sx={{marginBottom: 2}} variant="body1">Log In</Typography>
                    <TextField autoComplete="off" sx={{marginBottom: 2, "& .css-lqfcw6-MuiInputBase-input-MuiOutlinedInput-input":{color:"#000"}}} required value={values.email} type="text" onChange={handleChange} name="email" label="Email" />
                    <TextField autoComplete="off" sx={{"& .css-lqfcw6-MuiInputBase-input-MuiOutlinedInput-input":{color:"#000"}}} required value={values.password} type="password" onChange={handleChange} name="password" label="Password" />
                    <Grid container sx={{width:"100%",marginTop: 2}} direction="row" alignItems="center" justifyContent="center" wrap="nowrap">
                        {
                            loading ? (
                                <CircularProgress />
                            ):(
                                <MuiButton onClick={() => handleLogin()} disabled={Object.values(values).some(item=>item==="")} height={30} variant="contained" text="LOG IN" />
                            )
                        }                    
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
});

export default LoginContainer;
