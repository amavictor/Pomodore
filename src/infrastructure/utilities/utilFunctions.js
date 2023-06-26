
import { moderateScale, scale, moderateVerticalScale, verticalScale, s } from 'react-native-size-matters';

export const mScale = (size, scaleFactor) => Math.ceil(moderateScale(size, scaleFactor))
export const nScale = (size) => Math.round(scale(size))
export const mVScale = (size) => Math.round(moderateVerticalScale(size))
export const vScale = (size) => Math.round(verticalScale(size))


export const setTimeOfDay = () => {
    var time = new Date().getHours()
    switch (true) {
        case time < 12:
            return "Morning"
        case (time >= 12 && time <= 18):
            return "Afternoon"
        case (time > 18):
            return "Evening"
        default: ""
    }

}

export const removeTask = (task, item) => {
    task.filter((activity) => activity.title !== item.item)
}

const quotes = [
    {
        quote: "“Mastering others is strength.  Mastering yourself is true power.”",
        author: "Lao Tzu"
    },
    {
        quote: "“Self-control is the chief element in self-respect, and self-respect is the chief element in courage.”",
        author: "Thucydides"
    },
    {
        quote: "“You will never have a greater or lesser dominion than that over yourself…the height of a man’s success is gauged by his self-mastery; the depth of his failure by his self-abandonment. …And this law is the expression of eternal justice. He who cannot establish dominion over himself will have no dominion over others.”",
        author: "Leonardo da Vinci"
    },
    {
        quote: "“Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.” ",
        author: "John C. Maxwell"
    },
    {
        quote: "“We do today what they won’t, so tomorrow we can accomplish what they can’t.”",
        author: "JDwayne ‘The Rock’ Johnson"
    },
    {
        quote: "“True freedom is impossible without a mind made free by discipline.”",
        author: "Mortimer J. Adler"
    },


    {
        quote: "“Rule your mind or it will rule you. ”  ",
        author: "Horace"
    },
    {
        quote: "“It is better to conquer self than to win a thousand battles.”",
        author: "Buddha"
    },
    {
        quote: "“Most powerful is he who has himself in his own power.” ",
        author: "Seneca"
    },
]

export const getQuote = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return quote;
  };