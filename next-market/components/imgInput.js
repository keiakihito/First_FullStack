import{useState} from "react";

const ImgInput = (props) => {
    const [imageFile, setImageFile] = useState("");

    const handleClick = async (e) => {
        try{
            const data = new FormData();
            data.append("file", imageFile);
            data.append("upload_preset", "d0mbtspf"); // Upload present name in Cloudinary
            data.append("cloud_name", "dckr7xfd2");
            const response = await fetch("https://api.cloudinary.com/v1_1/dckr7xfd2/image/upload", {method: "POST", body: data});
            const jsonData = await response.json();
            await props.setImage(jsonData.url);
            alert("Success to upload image");
        }catch(err){
            alert("Fail to upload image");
        }
    }


    return (
        <div className="img-input">
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} accept="image/png, image/jpg"/>
            <button onClick={handleClick} disabled ={!imageFile}>Image Upload</button>
        </div>
    )
}

export default ImgInput;