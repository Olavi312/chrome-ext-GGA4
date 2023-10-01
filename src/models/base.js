
import { doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc, query, where, setDoc } from "firebase/firestore";
import { db } from "../core/firebase";

export class FireBaseModel
{
    constructor ( collectionName )
    {
        this.collectionName = collectionName;
        this.collectionRef = collection( db, collectionName );
    }
    _get = async ( id ) =>
    {
        let rlt = {};
        await getDoc( doc( db, this.collectionName, id ) ).then( result =>
        {
            rlt = result.data();
        } );
        return rlt;
    }

    _getFilter = async ( filterData ) =>
    {
        const taskQuery = query( collection( db, this.collectionName ), where( filterData._field, filterData.op, filterData.value ) );
        let rlt = [], tmp;
        await getDocs( taskQuery ).then( results =>
        {
            results.forEach( ( item ) =>
            {
                tmp = item.data();
                rlt.push( tmp );
            } );
        } );
        return rlt;
    }
    _getAll = async () =>
    {
        let rlt = [], tmp;
        await getDocs( this.collectionRef ).then( results =>
        {
            results.forEach( ( item ) =>
            {
                tmp = item.data();
                rlt.push( tmp );
            } );
        } );
        return rlt;
    }

    _add = async ( id, newData ) =>
    {
        let res = {};
        await setDoc( doc( db, this.collectionName, id ), { ...newData } ).then( result =>
        {
            res = { state: true, message: "success" }
        } ).catch( error =>
        {
            res = { state: false, message: "error db" }
        } )
        return res;
    }

    _update = async ( id, updateData ) =>
    {
        let res = {};
        await setDoc( doc( db, this.collectionName, id ), { ...updateData } ).then( result =>
        {
            res = { state: true, message: "success" }
        } ).catch( error =>
        {
            res = { state: false, message: "error db" }
        } )
        return res;
    }

    _delete = ( id ) =>
    {
        return deleteDoc( doc( db, this.collectionName, id ) );
    }
}
