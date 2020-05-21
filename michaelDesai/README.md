# Visual Value - Proposing a UI for Exploring Income Statements
## Parsons School of Design - MS of Data Visualization - Michael Desai - Class of 2020

### Created, scraped, and developed by Michael Desai
#### (Special thanks to George Sieniawski, Daniel Sauter, Aaron Hill, and Neil Oliver)


![App Preview](https://github.com/mi-desai/thesis/blob/master/preview.png)<br/>

# Abstract

This project was created to transform accounting statements away from their principally tabular form to a visual interface designed in accordance with principles of information design. The end objective is to reduce time that financial analysts spend reading through tabular data and trying to find additional on performance data within US Securitities and Exchange Commission documentation like Form-10-K's and Form-10'Q's.  

The tool allows users to explore five years of four companies' data:

<ul>
    <li><b>Cheniere Energy Inc</b> - largest US-based exporter of liquefied natural gas. </li>
    <li><b>Tesla Inc</b> - produces electric cars, batteries, and altenative energy solutions. </li>
    <li><b>Facebook Inc</b> - the dominant social media presence on the web. </li>
    <li><b>Alphabet Inc</b> - the parent company of Google, search engine and advertising colossus. </li>
    <li><b>Netflix Inc</b> - streaming video platform and media producer. </li>
</ul>

Data on these companies was obtained from the SEC, where it is available for the entire public to access, and where all publicly traded entities on US exchanges file financial performance data. Using the work of Rolf Hichert as a starting point, the project applies Hichert's work on International Business Communication Standards to corporate income statements, one of the main sources of company financial data. 

# Resources Used

<ul>
    <li><b>Vue.js</b> - open-source JavaScript framework for building user interfaces.</li>
    <li><b>D3.js</b> - open-source JavaScript library for creating visual web elements.</li>
    <li><b>Scrapy</b> - Python library for parsing and scraping files from the SEC.</li>
    <li><b>Node.js</b> - Javascript server-side scripting language, which was used for scraping from files.</li>
    <li><b>xml2json</b> - Node.js extension for converting DOM-like structure of XML to JSON.</li>
    <li><b>JQ</b> - Command-line utility for manipulating jsons.</li>
    <li><b>GSAP</b> - Greensock is a library for animating transitions between states of data.</li>
</ul>

# Early Designs

(Inspired by Rolf Hichert's horizontal waterfall chart)

Adobe XD Design: https://xd.adobe.com/view/c3859393-6962-4bd4-5898-a8dbaf23c9cd-b5b4/

P&L Page
![Design 1](https://github.com/mi-desai/thesis/blob/master/design/P%26L%20Page%20Wireframe.png)<br/>


# 1 - Obtaining the Data - XBRL or Manual Input?

SEC Filing Data is typically obtained manaully, via their online database <a href="https://www.sec.gov/edgar/searchedgar/companysearch.html">EDGAR</a>. Institutions have developed their own methods for obtaining and organizing this data to reduce time spent by analysts, traders, or algorithms waiting for company data to be delivered in a processed form. The only method available to the general public is manually parsing the texts of these filings. The data used for this project was found in company <a href="https://www.sec.gov/files/form10-k.pdf">Form 10-K's</a>. 


# 2 - Creating a data structure for company accounting data


summary


# 3 - Transforming the data structure for the front-end in Vue


summary



# 4 - Creating the bars in Vue


summary



# 5 - Creating the tooltips


summary


# 6 - Creating the table


summary



# 7 - Creating the Annotations

summary




# Using the UI

summary