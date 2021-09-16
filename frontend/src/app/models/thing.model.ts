export class Thing {
    _id: String;
    title: string;
    description: String;
    content: String;
    writer: String;
    date: String;
    comments: [{content: String, writer: String, date: String, time: String}];
}
