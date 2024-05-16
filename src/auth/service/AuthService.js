export class AuthService{
    getAuthDataFromLocalStorage(){
        const data = localStorage.getItem("authentication");
        console.log("getlocalstorfe ",data);
        if(!!data) return data;
        return null;
    }
    setAuthDataToLocalStorage(data){
        console.log("setlocalstorfe ",data);
        localStorage.setItem("authentication",data);
    }
    removeAuthDataFromLocalStorage(){
        localStorage.removeItem("authentication");
    }
    getRoleUser(){
        const data = this.getAuthDataFromLocalStorage();
        if(data==null) return data;
        return data.role;
    }
    getToken(){
        const data = this.getAuthDataFromLocalStorage();
        if(data==null) return data;
        return data;
    }
}