import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useState} from "react";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";

// eslint-disable-next-line react/prop-types
export function SearchBar({placeholder, onSearch}) {
    const [keyword, setKeyword] = useState("")
    return (
        <>
            <div className="flex align-items-center gap-2">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText
                        placeholder={placeholder}
                        type="text"
                        className="w-8rem sm:w-auto"
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value)
                        }
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") onSearch(keyword)
                        }}
                    />
                </IconField>
                <Button type="button" label="buscar" onClick={() => onSearch(keyword)}></Button>
            </div>
        </>
    )
}