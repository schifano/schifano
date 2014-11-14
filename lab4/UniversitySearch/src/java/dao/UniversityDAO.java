package dao;

import java.util.ArrayList;
import model.Universities;

/**
 *
 * @author schifano
 */
public interface UniversityDAO {
    public ArrayList<Universities> getAll();
    public Universities findByID(int id);
}