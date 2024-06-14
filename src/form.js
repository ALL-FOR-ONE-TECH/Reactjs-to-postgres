import React, { useState } from "react";

const FormCompond = () => {
    const [formData, setFormdata] = useState({
        name:'',
        address:'',
        number:'',
        gmail:''
    });

    const handleChange = (e) => {
        const {name,value} = e.target
        setFormdata (prevState => ({
            ...prevState,
            [name]:value
        }));
    };

    const handleSubmite = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/submit',{
                method: 'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(formData)
            });
            if (response.ok){
                console.log('form submite');
            }else{
                console.error('submission error');
            }
        }catch(error){
            console.error('ERROR',error);
        }
    };

    return(
        <form onSubmit={handleSubmite}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="name"/>
            </div>
            <div className="form-group">
                <label htmlFor="address">address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="address"/>
            </div>
            <div className="form-group">
                <label htmlFor="number">number</label>
                <input type="number" name="number" value={formData.number} onChange={handleChange} required placeholder="number"/>
            </div>
            <div className="form-group">
                <label htmlFor="gmail">gmail</label>
                <input type="email" name="gmail" value={formData.gmail} onChange={handleChange} required placeholder="Gmail"/>
            </div>
            <button type="submite">submite</button>
        </form>
    );
};


export default FormCompond;