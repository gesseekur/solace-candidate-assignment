"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;
    const searchTermLowercase = searchTerm.toLowerCase();

    (document.getElementById('search-term') as HTMLDivElement).innerHTML = searchTerm;
    const filteredAdvocates = advocates.filter((advocate) => {
      const firstName = advocate.firstName.toLowerCase();
      const lastName = advocate.lastName.toLowerCase();
      const city = advocate.city.toLowerCase();
      const degree = advocate.degree.toLowerCase();
      const specialties = advocate.specialties.map((s) => s.toLowerCase());
      const yearsOfExperience = advocate.yearsOfExperience;
      
      return (
        firstName.includes(searchTermLowercase) ||
        lastName.includes(searchTermLowercase) ||
        city.includes(searchTermLowercase) ||
        degree.includes(searchTermLowercase) ||
        specialties.some((s) => s.includes(searchTermLowercase))  ||
        yearsOfExperience === Number(searchTermLowercase)
      );
    });
    setFilteredAdvocates(filteredAdvocates);
  };

  const onResetClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
    (document.getElementById('search-input') as HTMLInputElement).value = '';
    (document.getElementById('search-term') as HTMLDivElement).innerHTML = '';
  };

  const debounce = (
    func: ((...args: any[]) => void ),
    delay: number
    ): ((...args: any[]) => void) => {
      let timeoutId: ReturnType<typeof setTimeout>;

      return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      };
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input id="search-input" style={{ border: "1px solid black" }} onChange={debounce(onChange, 500)} />
        <button onClick={onResetClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
