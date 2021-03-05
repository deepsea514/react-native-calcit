import Realm from 'realm';

//defining schemas for registeration process
export const USER_SCHEMA = 'UserSchema';
export const NEWPROJECT_SCHEMA = 'NEWPROJECT_SCHEMA';
export const CUSTOM_LOGO_SCHEMA = 'CUSTOM_LOGO_SCHEMA';
export const PROJECT_SCHEMA = 'PROJECT_SCHEMA';

//user schema
export const userSchema = {
    name: USER_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: { type: 'int' },
        email: { type: 'string', default: '' },
        notification_token: { type: 'string', default: '' },
        name: { type: 'string', default: '' },
        password: { type: 'string', default: '' },
        access_token: { type: 'string', default: '' }
    }
}

export const newProjectSchema = {
    name: NEWPROJECT_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: { type: 'string' },
        userReference: { type: 'string', default: '' },
        jobID: { type: 'string', default: '' },
        dateGenerated: { type: 'string', default: '' },
        siteAddress: { type: 'string', default: '' },
        postCode: { type: 'string', default: '' },
        createdAt: { type: 'string', default: Date.now() },
        userId: { type: 'int', default: '' }
    }
}

export const customLogoSchema = {
    name: CUSTOM_LOGO_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: { type: 'string' },
        customLogo: { type: 'string', default: '' },
        userId: { type: 'int', default: '' },
        createdAt: { type: 'string', default: Date.now() }
    }
}

export const projectSchema = {
    name: PROJECT_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: { type: 'string', },
        projectStates: { type: 'string', default: '' },
        createdAt: { type: 'string', default: Date.now() },
        userId: { type: 'int', default: '' },
        projectId: { type: 'string', default: '' }
    }
}


const databaseOptions = {
    path: 'CalcITFloorPlanner.realm',
    schema: [userSchema, newProjectSchema, customLogoSchema, projectSchema], //all the Schemas
    schemaVersion: 0
}


export default new Realm(databaseOptions);