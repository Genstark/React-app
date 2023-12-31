import React, {useState, useEffect, useRef} from "react";
import '../styling/AddItem.css';

function AddItem(){

    const [textareaValue, setTextareaValue] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const detailsTextareaRef = useRef(null);
    const imageInputRef = useRef(null);

    const [button, setButton] = useState('Add Item');

    useEffect(() => {
        const element = detailsTextareaRef.current;
        
        if (element){
            element.style.height = 'auto';
            element.style.height = element.scrollHeight + 'px';
            setTextareaHeight(element.style.height);
        }
        
    }, [textareaValue]);

    function Homepage(){
        window.location.href = "/";
    }

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState('');
    const [overview, setOverview] = useState('');
    const [details, setDetails] = useState('');

    function checkProductInput(){
        if(title.trim() === ''){
            alert("Please enter a title for the product.");
            return;
        }
        else if(category === ''){
            alert("Please select a category for this item.");
            return;
        }
        else if(address === ''){
            alert("Please provide an address for where the product is located.");
            return;
        }
        else if(state === ''){
            alert("Please indicate the state in which the product is located.");
            return;
        }
        else if(validPhoneNumber(number) === false){
            alert("Please enter a valid phone number.");
            return;
        }
        else if(overview === ''){
            alert("Please add some information about the product to the overview field.");
            return;
        }
        else if(details === ''){
            alert("Please provide more details about the product in the details section.");
            return;
        }
        else{

            const currentDate = new Date();
            const dateTimeString = currentDate.toLocaleString();
            const dateTimeSplit = dateTimeString.split(',')[0];

            const data = {
                "title": title,
                "category": category,
                "price": price,
                "address": address,
                "state": state,
                "phonenumber": number,
                "overview": overview,
                "details": details,
                'date': dateTimeSplit
            }

            return data;
        }
    }

    function validPhoneNumber(number){
        const numberChecking = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return numberChecking.test(number);
    }


    function addProduct(event){
        event.preventDefault();
        //get form data and validate it
        const data = checkProductInput();
        const formData = new FormData();

        formData.append('token', sessionStorage.getItem('token'));
        formData.append('data', sessionStorage.getItem('data'));
        formData.append('title', data['title']);
        formData.append('category', data['category']);
        formData.append('address', data['address']);
        formData.append('state', data['state']);
        formData.append('phonenumber', data['phonenumber']);
        formData.append('price', data['price']);
        formData.append('files', imageInputRef.current.files[0]);
        formData.append('files', imageInputRef.current.files[1]);
        formData.append('files', imageInputRef.current.files[2]);
        formData.append('overview', data['overview']);
        formData.append('details', data['details']);
        formData.append('date', data['date']);


        const apiUrl = 'http://localhost:2000/addProduct';
        const options = {
            method: 'POST',
            body: formData
        }

        try{
            setButton('Wait...')
            fetch(apiUrl, options).then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                setTitle('');
                setCategory('');
                setAddress('');
                setState('');
                setNumber('');
                setPrice('');
                setOverview('');
                setDetails('');
                setButton('Add Item');
            }).catch(error => {
                console.log(error);
            });
        }
        catch{
            alert("Error in network while adding product");
        }
    }


    return(
        <>
            <div className="home-page">
                <h3 className="heading" style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={Homepage}>Compro Marketplace</h3>
            </div>

            <div className="itemAdd">
                <label htmlFor="title" className="labelName">Title:</label><br />
                <input type="text" id="title" name="name" className="inputData" placeholder="enter your full name" onChange={(e) => setTitle(e.target.value)} /><br />

                <label htmlFor="category" className="labelName">Category:</label><br />
                <select id="category" name="category" className="categoryDropdown" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Choosr Product Type</option>
                    <option value="Electronics" alt="Electronics">Electronics</option>
                    <option value="Bike" alt="Bike">Bike</option>
                </select><br />

                <label htmlFor="address" className="labelName">Address:</label><br />
                <input type="text" id="address" name="address" placeholder="Street Address" className="inputData" onChange={(e) => setAddress(e.target.value)} /><br />

                <label htmlFor="state" className="labelName">State:</label><br />
                <input type="text" id="state" name="state" placeholder="enter your state" className="inputData" onChange={(e) => setState(e.target.value)} /><br />

                <label htmlFor="number" className="labelName">Number:</label><br />
                <input type="text" id="number" name="number" placeholder="enter your mobile number" className="inputData" onChange={(e) => setNumber(e.target.value)} /><br />

                <label htmlFor="price" className="labelName">Price:</label><br />
                <input type="number" id="price" name="price" placeholder="enter price of product" className="inputData" min={100} onChange={(e) => setPrice(e.target.value)} /><br />

                <label htmlFor="images" className="labelName">Images:</label>
                <input type="file" accept=".jpg,.jpeg,.png" multiple id="images" ref={imageInputRef} style={{marginLeft: 10, marginBottom: 13}} onChange={(e) => setImage(e.target.value)} /><br />

                <label htmlFor="overview" className="labelName">Overview:</label><br />
                <textarea name="overview" id="overview" className="inputData" style={{resize: 'none', height: 150, fontSize: 15, paddingTop: 4, overflowY: 'hidden'}} onChange={(e) => setOverview(e.target.value)} /><br />

                <label htmlFor="details" className="labelName">Details:</label><br />
                <textarea className="inputData" id="details" name="details" value={textareaValue} onChange={(e) => {setTextareaValue(e.target.value);
                                                                                                                    setDetails(e.target.value);}} 
                    ref={detailsTextareaRef}
                    style={
                        {resize: 'none',
                        height: textareaHeight,
                        fontSize: 15,
                        paddingTop: 4,
                        overflowY: 'hidden'}
                    }
                />

                <button className="addProduct" onClick={addProduct}>{button}</button>

            </div>
        </>
    );
}

export default AddItem;