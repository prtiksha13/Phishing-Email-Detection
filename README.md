# Phishing-Email-Detection

# Phishing Email Detection System

## Project Description

The **Phishing Email Detection System** is a Java-based web application designed to identify potentially malicious and legitimate emails using script-based keyword detection and Google Gemini AI integration.

The system analyzes email content, detects suspicious keywords and patterns, and generates a phishing risk score. It also displays the estimated safety percentage to help users understand the potential risk associated with an email.

The application combines keyword-based analysis with AI-powered detection to provide a more informative email security assessment.

## Main Technologies

- **Java** – Core programming language
- **Spring Boot** – Backend application framework (if used)
- **Google Gemini AI API** – AI-powered email analysis
- **HTML5** – Web page structure
- **CSS3** – User interface design
- **JavaScript** – Client-side functionality
- **MySQL** – Database management (if used)

## Key Features

- **Phishing Email Detection:** Analyzes email content to identify potentially malicious messages.
- **Keyword Detection:** Uses predefined suspicious keywords and patterns to identify phishing indicators.
- **Google Gemini AI Integration:** Uses Gemini AI to analyze email content and provide additional insights.
- **Phishing Risk Score:** Generates a score representing the potential phishing risk.
- **Safety Percentage:** Displays an estimated percentage indicating how safe or risky an email may be.
- **Email Classification:** Classifies emails based on the calculated score and detection results.
- **Admin Dashboard:** Provides administrators with an overview of email detection activities and related statistics.
- **Report Generation:** Allows users to download reports containing email analysis results.
- **Script-Based Detection:** Uses custom scripts and detection logic as part of the phishing identification process.

## How It Works

1. The user enters or submits email content.
2. The system scans the email for suspicious keywords and patterns.
3. Script-based detection logic evaluates the identified indicators.
4. Google Gemini AI performs additional analysis of the email content.
5. The system calculates or generates a phishing risk score.
6. The result displays the phishing classification and estimated safety percentage.
7. The user can download the analysis report.
8. The administrator can monitor detection activities through the dashboard.

## Detection and Risk Assessment

The system uses phishing scores and detection indicators to classify emails.

The classification depends on the scoring conditions and thresholds configured in the application. For example, a score above 50 may indicate a potentially phishing email if that is the threshold defined in the detection logic.

## Admin Dashboard

The admin dashboard provides an overview of the system's email detection activities, statistics, and available administrative information.

## Report Download

The system allows users to download reports containing the results of email analysis for documentation and further review.

## Project Objective

The main objective is to develop an accessible email security application that combines keyword-based detection and AI-assisted analysis to help users identify suspicious emails and understand phishing risks.

## Disclaimer

This project is developed for educational and cybersecurity awareness purposes. Detection scores and AI-generated results are indicative and should not be considered a guarantee of email safety.
