import { useEffect, useState } from "react";
import "./App.css";

interface Telefon {
  id: number;
  nev: string;
  gyarto: string;
  ar: number;
  memoria: number;
  tarhely: number;
  kijelzo: number;
  operaciosRendszer: string;
}

function App() {
  const [telefonok, setTelefonok] = useState<Telefon[]>([]);
  const [novekvo, setNovekvo] = useState(true);

  useEffect(() => {
    fetch("/phones.json")
      .then((valasz) => valasz.json())
      .then((adatok) => setTelefonok(adatok));
  }, []);

  const rendezettTelefonok = [...telefonok].sort((a, b) =>
    novekvo
      ? a.nev.localeCompare(b.nev, "hu")
      : b.nev.localeCompare(a.nev, "hu"),
  );

  return (
    <main className="container">
      <h1>Mobiltelefonok</h1>

      <div className="eszkoztar">
        <button onClick={() => setNovekvo(!novekvo)}>
          Rendezés: {novekvo ? "A–Z" : "Z–A"}
        </button>

        <span>{telefonok.length} telefon</span>
      </div>

      <div className="tablazat-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Név</th>
              <th>Gyártó</th>
              <th>Ár (Ft)</th>
              <th>Memória (GB)</th>
              <th>Tárhely (GB)</th>
              <th>Kijelző (col)</th>
              <th>Operációs rendszer</th>
            </tr>
          </thead>

          <tbody>
            {rendezettTelefonok.map((telefon) => (
              <tr key={telefon.id}>
                <td>{telefon.id}</td>
                <td>{telefon.nev}</td>
                <td>{telefon.gyarto}</td>
                <td>{telefon.ar} Ft</td>
                <td>{telefon.memoria}</td>
                <td>{telefon.tarhely}</td>
                <td>{telefon.kijelzo}</td>
                <td>{telefon.operaciosRendszer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;
