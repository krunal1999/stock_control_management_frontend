import React from 'react'
import img from "../img/page404.jpg";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const Page404 = () => {
        return (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "90vh",
                      flexDirection:"column"
                    }}
                  >
                    {/* <a href="https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_8030430.htm#query=404&position=1&from_view=search&track=sph">Image by storyset</a> on Freepik */}
                    <img
                      src={img}
                      alt="401 page"
                      style={{ height: "100%", width: "auto", margin: "0 auto" }}
                    />
                    <Typography>
                    <Link to="/login">Go back to Login</Link>
                    </Typography>
                  </div>
                </>
              );
}

export default Page404