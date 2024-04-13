import { desc, relations } from "drizzle-orm";
import { integer, pgTable,  serial, text,pgEnum,boolean } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("imageSrc").notNull(),
});
export const units=pgTable("units",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    description:text("description").notNull(),
    courseId:integer("course_id").references(()=>courses.id,{onDelete:"cascade"}).notNull(),
    order:integer("order").notNull(),
})

export const unitsRelation=relations(units,({many,one})=>({
    course:one(courses,{
        fields:[units.courseId],
        references:[courses.id]
    }),
    lessons:many(lessons)
}))

export const lessons=pgTable("lessons",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    unitId:integer("unit_id").references(()=>units.id,{onDelete:"cascade"}).notNull(),
    order:integer("order").notNull(),
})

export const lessonsRelation=relations(lessons,({one,many})=>({
    unit:one(units,{
        fields:[lessons.unitId],
        references:[units.id]
    }),
    challenges:many(challenges)
})) 

export const challengesEnum=pgEnum("type",["SELECT","ASSIST"]);
export const challenges=pgTable("challenges",{
    id:serial("id").primaryKey(),
    lessonId:integer("lesson_id").references(()=>lessons.id,{onDelete:"cascade"}).notNull(),
    type:challengesEnum("type").notNull(),
    question:text("question").notNull(),
    order:integer("order").notNull(),
})
export const challengesRelation = relations(challenges, ({ one, many }) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id]
    }),
    ChallengeOptions: many(ChallengeOptions),
    challengeProcess: many(challengeProcess)
}));

export const ChallengeOptions=pgTable("challenge_options",{
    id:serial("id").primaryKey(),
    challengeId:integer("challenge_id").references(()=>challenges.id,{onDelete:"cascade"}).notNull(),
    text:text("text").notNull(),
    correct:boolean("correct").notNull(),
    imageSrc:text("imageSrc"),
    audioSrc:text("audioSrc"),
})

export const ChallengeOptionsRelation=relations(ChallengeOptions,({one})=>({
    challenge:one(challenges,{
        fields:[ChallengeOptions.challengeId],
        references:[challenges.id]
    }),

}));

export const challengeProcess=pgTable("challenge_process",{
    id:serial("id").primaryKey(),
    userId:text("user_id").notNull(),
    challengeId:integer("challenge_id").references(()=>challenges.id,{onDelete:"cascade"}).notNull(),
    completed:boolean("completed").notNull().default(false),
})

export const challengeProcessRelation=relations(challengeProcess,({one})=>({
    challenge:one(challenges,{
        fields:[challengeProcess.challengeId],
        references:[challenges.id]
    })
}))

export const coursesRelation=relations(courses,({many})=>({
    userProgress:many(userProgress),
    units:many(units),
}))
export const userProgress = pgTable("user_progress", {
    userId:text("user_id").primaryKey(),
    userName:text("user_name").notNull().default("User"),
    userImageSrc:text("user_image_src").notNull().default("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"),
    activeCourseId:integer("active_course_id").references(()=>courses.id,{onDelete:"cascade"}),hearts:integer("hearts").notNull().default(5),
    points:integer("points").notNull().default(0),
});

export const userProgressRelation=relations(userProgress,({one})=>({
    activeCourse:one(courses,{
        fields:[userProgress.activeCourseId],
        references:[courses.id]
    }),
}))

//.references(()=>courses.id,{onDelete:"cascade"})