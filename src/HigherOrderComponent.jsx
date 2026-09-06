export function HigherOrderComponent(WrappedComponent){
    return function innerFunction(){
        return(
            <>
            <WrappedComponent />
            </>
        )
    }
}

export const Hello=()=>{
    return(
        <p>Hello React</p>
    )
}

export const Response=HigherOrderComponent(Hello)