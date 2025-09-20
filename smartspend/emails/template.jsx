import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

export default function EmailTemplate({
    userName= "",
    type = "budget-alert",
    data = {},
    }) 
    {
    if(type === "monthly report") {
        
    }


    if(type === "budget-alert") {
        return (
            <Html>
              <Head />
              <Preview>Budget Alert</Preview>
              <Body style={styles.body}>
                <Container style={styles.container}>
                    <Heading style={styles.title}>Budget Alert</Heading>
                    <Text style={styles.text}>Hello {userName},</Text>
                    <Text style={styles.text}> 
                        You&rsquo;re approaching your budget limit for this month. <br />
                        You have used {data?.percentageUsed.toFixed(2)}% of your budget of ₹{data.budgetAmount}.
                    </Text>
                    <Section style={styles.statsContainer}>
                        <div style={styles.stat}>
                            <Text style ={styles.text}>Budget Amount</Text>
                            <Text style ={styles.heading}>₹{data?.budgetAmount}</Text>
                        </div>

                        <div style={styles.stat}>
                            <Text style ={styles.text}>Spent So Far</Text>
                            <Text style ={styles.heading}>₹{data?.totalExpenses}</Text>
                        </div>

                        <div style={styles.stat}>
                            <Text style ={styles.text}>Remaining</Text>
                            <Text style ={styles.heading}>
                                ₹{data?.budgetAmount - data?.totalExpenses}
                            </Text>
                        </div>
                        
                    </Section>
                </Container>
              </Body>
            </Html>
        );
    }  
}

const styles ={
    body : {
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
    },
    container: {
        backgroundColor: "#ffffff",
        margin: "0 auto",
        padding: "20px",
        maxWidth: "600px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    title: {
        fontSize: "30px",   
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333333",
        textAlign: "center",
    },
    heading: {                  
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333333",
        marginTop: "5px",
    },
    text: {
        fontSize: "16px",
        color: "#555555",
        lineHeight: "1.5",
        marginBottom: "20px",       
    },
    statsContainer: {        
        marginTop: "20px",
        padding: "10px",
        borderTop: "1px solid #eeeeee",
        backgroundColor: "#fafafa",
        borderRadius: "8px",
    },  
    stat: {
        textAlign: "center",
        margin: "32px",
        backgroundColor: "#ffffff",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },      
};