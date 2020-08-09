import java.io.*;

class JavaDemo1{
    public static void main(String args[]){
        System.out.println("::Java Serialization::");

        User u1 = new User();
        u1.name = "b1twis3";
        u1.age = 30;

        //Saving the data into a file
        String fname = "test.serialized";

        try{

            FileOutputStream file = new FileOutputStream(fname);
            ObjectOutputStream out = new ObjectOutputStream(file);

            // Serializing the User object
            out.writeObject(u1);

            out.close();
            file.close();

        }
        catch(IOException ex){
            System.out.println("Error!");
        }
    }
}
