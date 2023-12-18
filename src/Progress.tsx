import React,{useState} from 'react';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts';
import './Progress.css'



const Progress = () => {


const [excelData, setExcelData] = useState(null);

  const handleFile = (e:any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event:any) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData:any = XLSX.utils.sheet_to_json(worksheet);

        setExcelData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const data:any=excelData

  return (
    <>
        <div className='container'>
            <input type='file' onChange={handleFile} accept='.xlsx'/>
        
            {data?<BarChart width={600} height={300} data={data}>
                <XAxis dataKey="Students Name" stroke="#8884d8" />
                <YAxis />
                <Tooltip/>
                <Bar dataKey="English" fill="#8884d8" barSize={20} />
                <Bar dataKey="Tamil" fill="#fcc203" barSize={20} />
                <Bar dataKey="Maths" fill="#32a852" barSize={20} />
                <Bar dataKey="Science" fill="#327da8" barSize={20} />
                <Bar dataKey="Social" fill="#a83258" barSize={20} />
            </BarChart>:<p style={{color:"red"}}>Please select the excel file</p>}
        </div>
    </>
  )
}

export default Progress