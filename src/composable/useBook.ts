import type { Book } from '../interface/Book'; 
import { reactive, onMounted, ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'; 
import { useToast } from 'vue-toastification'; 
import type { VForm } from 'vuetify/components/VForm'; 
import axios from 'axios'; 

//for validation
const validateBook = {
    required: (value: string) => !!value || 'This field is required',
};
const formRef = ref<VForm | null>(null);

//COMPOSABLE FOR ADDBOOK
export function useAddBook(){
    const router = useRouter(); 
    const toast = useToast();  
    
    const rules={
        title: [validateBook.required],
        author: [validateBook.required],
        description: [validateBook.required],
        status: [validateBook.required],
    };

    //form state for add book
    const form = reactive ({
    title: '',
    author: '',
    genre: '',
    description: '',
    status: 'Want to Read', // Set default status first
    });

    // Option for the status dropdown
    const statusOptions = ['Reading', 'Completed', 'Want to Read'];

    //for submit handler to add new book
    const handleSubmit = async () => {
    const isValid = await formRef.value?.validate();
    if (!isValid) return;
    
    const newBook = {
        title : form.title,
        author : form.author,
        genre : form.genre,
        description : form.description,
        status : form.status,
    }

    try {
        const response = await axios.post('/api/books', form);
        toast.success('Book Added Successfully');
        router.push(`/books/${response.data.id}`);
        } catch (error) {
        console.error('Error add book', error);
        toast.error('Book Was Not Added');
        }
    };

    return { 
        form,
        formRef,
        rules,
        statusOptions,
        handleSubmit,
    }
}

// COMPOSABLE FOR UPDATE BOOK

export function useUpdateBook(){
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const bookId = route.params.id as string;
    const statusOptions = ['Reading', 'Completed', 'Want to Read'];

    const rules={
        title: [validateBook.required],
        author: [validateBook.required],
        description: [validateBook.required],
        status: [validateBook.required],
    };

    const form = reactive({
    title: '',
    author: '',
    genre: '',
    description: '',
    status: '',
    });

    const state = reactive({
    book: {},
    isLoading: true,
    });

    // Submit handler for update existing book
    const handleSubmit = async () => {
    try {
        const response = await axios.put(`/api/books/${bookId}`, form);
        toast.success('Book Updated Successfully');
        router.push(`/books/${response.data.id}`);
    } catch (error) {
        console.error('Error updating book', error);
        toast.error('Book Was Not Updated');
    }
    };

    // Fetch book data
    onMounted(async () => {
    try {
        const response = await axios.get(`/api/books/${bookId}`);
        const book = response.data;
        form.title = book.title;
        form.author = book.author;
        form.genre = book.genre;
        form.description = book.description;
        form.status = book.status;
    } catch (error) {
        console.error('Error fetching book', error);
    } finally {
        state.isLoading = false;
    }
    });

    return{
        form,
        statusOptions,
        handleSubmit,
        state,
    };
}


// COMPOSABLE FOR FETCHING AND FILTERING BOOKS
export function useFecthBook(){
    const route = useRoute();
    const allBooks = ref<Book[]>([]);

    const state = reactive<{
    books: Book[];
    isLoading: boolean;
    }>({
    books: [],
    isLoading: true,
    });

    const fetchAndFilterBooks = async () => {
        state.isLoading = true;
        try {
            const response = await axios.get<Book[]>('/api/books');
            allBooks.value = response.data;

            const search = route.query.q?.toString().toLowerCase() || '';

            state.books = search
            ? allBooks.value.filter(book =>
                [book.title, book.author, book.genre].some(field =>
                    field?.toLowerCase().includes(search)
                )
                )
            : allBooks.value;
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            state.isLoading = false;
        }
    };

    return{
        state,
        route,
        fetchAndFilterBooks,
        
    };

}

