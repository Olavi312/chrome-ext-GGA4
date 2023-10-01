
import { FireBaseModel } from "./base";

class Language extends FireBaseModel
{
    constructor ()
    {
        super( `language` );
    }

    async getTranslation ( lang_iso )
    {
        return await new FireBaseModel( `${ this.collectionName }/${ lang_iso }/translation` )._getAll()
    }

    async getENTranlation ()
    {
        return await this.getTranslation( 'en' );
    }


    async getESTranlation ()
    {
        return await this.getTranslation( 'es' );
    }


    async getITTranlation ()
    {
        return await this.getTranslation( 'it' );
    }


    async getROTranlation ()
    {
        return await this.getTranslation( 'ro' );
    }


    async getSKTranlation ()
    {
        return await this.getTranslation( 'sk' );
    }
}

export default new Language();