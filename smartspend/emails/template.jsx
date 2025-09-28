import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

export default function EmailTemplate({
    userName= "",
    type = "month-report",
    data = {},
    }) 
    {
    if(type === "monthly-report") {
        return (
        <Html>
            <Head />
            <Preview>Your Monthly Financial Report</Preview>
            <Body style={styles.body}>
            <Container style={styles.container}>
                <Heading style={styles.title}>Monthly Financial Report</Heading>
                <Text style={styles.text}>Hello {userName},</Text>
                <Text style={styles.text}> 
                    Here&rsquo;s your financial summary for {data?.month}. <br />
                </Text>
                    {/* Main Stats */}
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Income</Text>
                <Text style={styles.heading}>₹{data?.stats.totalIncome.toFixed(2)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Expenses</Text>
                <Text style={styles.heading}>₹{data?.stats.totalExpenses.toFixed(2)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Net</Text>
                <Text style={styles.heading}>
                  ₹{(data?.stats.totalIncome - data?.stats.totalExpenses).toFixed(2)}
                </Text>
              </div>
            </Section>

            {/* Category Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Expenses by Category</Heading>
                {Object.entries(data?.stats.byCategory).map(
                  ([category, amount]) => (
                    <div key={category} style={styles.row}>
                      <Text style={styles.text}>{category  }</Text> 
                      <Text style={styles.text}>{"  "}₹{amount.toFixed(2)}</Text>
                    </div>
                  )
                )}
              </Section>
            )}

            {/* AI Insights */}
            {data?.insights && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>SmartSpend Insights</Heading>
                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using SmartSpend. Keep tracking your finances for better
              financial health!
            </Text>
          </Container>
        </Body>
      </Html>)
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
    section: {
        marginTop: "32px",
        padding: "20px",
        backgroundColor:"f9fafb",
        borderRadius: "5px",
        border: "1px solid #e5e7eb"
    },  
    row: {
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid #e5e7eb"
    }
};