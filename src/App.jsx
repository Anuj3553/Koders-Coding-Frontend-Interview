import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const [desc, setDesc] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")

  const [data, setData] = useState(() => {
    // Get local storage data
    return JSON.parse(localStorage.getItem("expense")) || []
  })

  // Set local storage data
  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(data))
  }, [data])


  const handleChangeDesc = (e) => {
    setDesc(e.target.value)
  }

  const handleChangeAmount = (e) => {
    setAmount(e.target.value)
  }

  const handleChangeDate = (e) => {
    setDate(e.target.value)
  }

  const handleSubmit = () => {
    let newExpense = {
      id: uuidv4(),
      desc: desc,
      amount: amount,
      date: date
    }
    setData([...data, newExpense])

    setDesc("")
    setAmount("")
    setDate("")
  }

  const handleDelete = (id) => {
    let ask = confirm("Are you want to sure to delete it ?")
    if (ask) {
      setData(data.filter((item) => { item.id !== id }))
    }
  }

  const handleUpdate = (id) => {
    let updateData = data.find((item) => item.id === id)
    if (updateData) {
      setDesc(updateData.desc)
      setAmount(updateData.amount)
      setDate(updateData.date)
    }
    setData(data.filter((item) => { item.id !== id }))
  }

  const handleFilter = () => {
    setData((prevData) => [...prevData.sort((a, b) => new Date(a.date) - new Date(b.date))]);
  };

  return (
    <>
      <h1>Expense Tracker App</h1>
      <div>
        <label htmlFor="desc">Description :</label>
        <input type="text" id="desc" value={desc} onChange={handleChangeDesc} />
      </div>
      <div>
        <label htmlFor="desc">Amount :</label>
        <input type="number" id="amount" value={amount} onChange={handleChangeAmount} />
      </div>
      <div>
        <label htmlFor="desc">Date :</label>
        <input type="date" id="date" value={date} onChange={handleChangeDate} />
      </div>

      <button onClick={handleSubmit}>Save</button>
      <button onClick={handleFilter}>Filter</button>

      <hr />

      <div style={{ marginTop: '2rem', display: "flex", justifyContent: "space-around", border: '1px solid black', padding: '0.5rem', minHeight: '50vh' }}>
        <div>
          <h2>Description</h2>
          {data.map((item) => {
            return <div key={item.id}>{item.desc}</div>
          })}
        </div>

        <div>
          <h2>Amount</h2>
          {data.map((item) => {
            return <div key={item.id}>{item.amount}</div>
          })}
        </div>

        <div>
          <h2>Date</h2>
          {data.map((item) => {
            return <div key={item.id}>{item.date}</div>
          })}
        </div>

        <div>
          <h2>Update</h2>
          {data.map((item) => {
            return <div key={item.id}>
              <button onClick={() => handleUpdate(item.id)}>Update</button>
            </div>
          })}
        </div>

        <div>
          <h2>Delete</h2>
          {data.map((item) => {
            return <div key={item.id}>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          })}
        </div>
      </div>

      <h2>Total :
        ₹{
          data.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2)
        }
      </h2>
    </>
  )
}

export default App
