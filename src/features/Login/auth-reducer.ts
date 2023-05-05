import { Dispatch } from 'redux'
import { authAPI } from '../../api/todolists-api'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
// export const loginTC = (data: AuthType) => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'))
//     authAPI.login(data).then(res=>{
//         if(res.data.resultCode===0){
//             dispatch(setIsLoggedInAC(true))
//             dispatch(setAppStatusAC('succeeded'))
//         }else {
//             handleServerAppError(res.data, dispatch);
//         }
//     }).catch(err=>{
//         handleServerNetworkError(err, dispatch)
//     })
// }

export const loginTC = (data: AuthType) => async(dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch(e){
        //@ts-ignore
        handleServerNetworkError(e, dispatch)
    }
}

export const logOutTC = () => async(dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch(e){
        //@ts-ignore
        handleServerNetworkError(e, dispatch)
    }
}

// types
export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
export type AuthType = {
    email:string,
    password:string
    rememberMe:boolean
    captcha?:string
}