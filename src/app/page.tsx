"use client";

import { useEffect, useState } from "react";
import { useStyles } from './page.styles';
import Image from 'next/image'

export default function Home() {
  const { classes } = useStyles();

  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setIsLoading(false);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <div className={classes.logoContainer}><Image alt="Solace Logo" width={100} height={100} src="/solace-logo.png" /> Advocates</div>
      <br />
      <hr/> 
      <br />
      <div>
        <p className={classes.title}>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input id="search-input" placeholder="Type in your search here..." className={classes.input} onChange={onChange} />
        <button className={classes.button} onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      {isLoading? <div>Loading...</div>: 
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Degree</th>
              <th>Specialties</th>
              <th>Years of Experience</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.length ? 
            filteredAdvocates.map((advocate) => {
                return (
                  <tr key={advocate.firstName}>
                    <td>{advocate.firstName}</td>
                    <td>{advocate.lastName}</td>
                    <td>{advocate.city}</td>
                    <td>{advocate.degree}</td>
                    <td>
                      {advocate.specialties.map((s) => (
                        <div key={s}>{s}</div>
                      ))}
                    </td>
                    <td>{advocate.yearsOfExperience}</td>
                    <td>{advocate.phoneNumber}</td>
                  </tr>
                );
            }) : <div className={classes.noResultsContainer}>No Results Found</div>}
          </tbody>
        </table>
      </div>}
    </main>
  );
}
