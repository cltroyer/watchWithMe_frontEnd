import React, { useEffect, useState } from "react";

const Histdata = () => {
  // Data store
  const [race, setRace] = useState(null);
  const [ststandings, setStstandings] = useState(null);
  const [stconstr, setStconstr] = useState(null);
  //display selector
  const [sced, setSced] = useState(true);
  const [standings, setStandings] = useState(false);
  const [constr, setConstr] = useState(false);

  const selsced = () => {
    setSced(true);
    setStandings(false);
    setConstr(false);
  };

  const selstandings = () => {
    setSced(false);
    setStandings(true);
    setConstr(false);
  };

  const selconstr = () => {
    setSced(false);
    setStandings(false);
    setConstr(true);
  };

  const fetchRaceData = () => {
    const url = "https://ergast.com/api/f1/2021.json";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRace(data.MRData.RaceTable.Races);
      });
  };

  const fetchStanding = () => {
    const url = "https://ergast.com/api/f1/current/driverStandings.json";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setStstandings(
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        );
      });
  };

  const fetchConst = () => {
    const url = "https://ergast.com/api/f1/current/constructorStandings.json";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setStconstr(
          data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        );
      });
  };

  useEffect(() => {
    fetchRaceData();
    fetchStanding();
    fetchConst();
    // eslint-disable-next-line
  }, []);

  if (!race) {
    return "loading.....";
  }
  if (!ststandings) {
    return "loading.....";
  }
  if (!stconstr) {
    return "loading.....";
  }

  if (sced === true) {
    console.log(ststandings);
    console.log(stconstr);
    return (
      <>
        <h1>Season Schedule</h1>
        <ul>
          {race.map((round) => (
            <li>
              {round.round} - <a href={round.Circuit.url}>{round.raceName}</a> -
              {round.date}
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => selsced()}>Schedule</button>
          <button onClick={() => selstandings()}>Driver Standings</button>
          <button onClick={() => selconstr()}>Construstor Standings</button>
        </div>
      </>
    );
  }

  if (standings === true) {
    return (
      <>
        <h1>Drivers Standings</h1>
        <ul>
          {ststandings.map((driver) => (
            <li>
              {driver.position}{" "}
              <a href={driver.Driver.url}>
                {driver.Driver.givenName} {driver.Driver.familyName}
              </a>{" "}
              - {driver.points}
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => selsced()}>Schedule</button>
          <button onClick={() => selstandings()}>Driver Standings</button>
          <button onClick={() => selconstr()}>Construstor Standings</button>
        </div>
      </>
    );
  }

  if (constr === true) {
    return (
      <>
        <h1>Constructor Standings</h1>
        <ul>
          {stconstr.map((manu) => (
            <li>
              {manu.position} -{" "}
              <a href={manu.Constructor.url}>{manu.Constructor.name}</a> -
              {manu.points}
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => selsced()}>Schedule</button>
          <button onClick={() => selstandings()}>Driver Standings</button>
          <button onClick={() => selconstr()}>Construstor Standings</button>
        </div>
      </>
    );
  }
};

export default Histdata;
