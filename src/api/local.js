const STORGE_KEY = 'topics'

const read = () => {
    try {
        return JSON.parse(localStorage.getItem(STORGE_KEY) || '[]')
    }catch (error) {
        return []
    }
}

const write = (topics) => {
    localStorage.setItem(STORGE_KEY, JSON.stringify(topics))
}

const delay = (ms = 150) => {
    return new Promise((resolve) => setTimeout(resolve, ms)) 
}

const localAPI = {
    getAll: async() => {
        await delay()

        return read()
    },

    getById: async (id) => {
        await delay()

        return read().find((topic) => topic.id === id) ?? null
    },

    add: async (topic) => {
        await delay()

        const newTopic = {
            ...topic,
            id: crypto?.randomUUID() ?? Date.now().toString()
        }

        write([...read(), newTopic])

        return newTopic
     },

    delete:  async (id) => {
        await delay()

        const topic = read().filter((topic) => topic.id !== id)
        write(topic)
    },

    deleteAll: async (tasks) => {
        await delay()
        write([])
    },
}

export default localAPI