import {pgTable,text,uuid,integer,boolean,timestamp} from "drizzle-orm/pg-core"
import{relations} from "drizzle-orm"


export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),
    //basic file/folder information 
    name: text("name").notNull(),
    path: text("path").notNull(),// /document/project/resume.pdf
    size: integer("size").notNull(),
    type: text("type").notNull(), // file or folder 

    //storage information
    fileurl:text("fileurl").notNull(), //url to access file
    thumbnailUrl:text("thumbnailUrl"), //url to access thumbnail
    
    //ownership information
    userId:text("userid").notNull(), //user id of the owner
    parentId:uuid("parent_Id"), //parent folder is (null for root items)

    //file/folder flags
    isFolder:boolean("is_Folder").notNull().default(false), //is this a folder or file
    isStared:boolean("is_stared").notNull().default(false), //is this file starred
    isTrash:boolean("is_trash").notNull().default(false), //is this file in trash
   
    //Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(), //when was this file created
    updatedAt: timestamp("updated_at").defaultNow().notNull(), //when was this file last updated
})

/* parent: each file/folder can have one parent folder
   children: each file/folder can have many child files/folders 
*/

export const filesRelations = relations(files, ({one,many}) => ({
    parent: one(files,{
        fields: [files.parentId],
        references: [files.id],
    }),

    //relationship to child file/folder
    children: many(files),
}))

//type definations
/*type file={
    id:string,
    name:string,
    isFolder:boolean,
    plus other inferred fields
}*/
export const File =typeof files.$inferSelect
export const NewFile =typeof files.$inferInsert
