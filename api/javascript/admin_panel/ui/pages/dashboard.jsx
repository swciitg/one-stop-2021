import React from "react";
import styled from "styled-components";
import {
    Box,
    H2,
    H5,
    H4,
    Text,
    Illustration,
    IllustrationProps,
    Button,
} from "@adminjs/design-system";

import { useTranslation } from "adminjs";

const pageHeaderHeight = 284;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

export const DashboardHeader = () => {
    const { translateMessage } = useTranslation();
    return (
        <Box mt="20px" px="20px">
            <H2>Welcome, Admin</H2>
        </Box>
    );
};

export const Dashboard = () => {
    const { translateMessage, translateButton } = useTranslation();
    return (
        <Box>
                <section
                style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    marginTop:"32px"
                }}>
                <p style={{
                    // fontSize: "3rem",
                }}>
                    <span style={{
                    fontSize: "3rem",
                    fontWeight:"700"
                }}>
                    OneStop 
                    </span>
                    <span style={{
                        fontSize: "3rem",
                        fontWeight:"normal",
                        color:"#282828"
                    }}>{" "}
                    Admin
                    </span>
                    </p>
                </section>

        </Box>
    );
};

export default Dashboard;
