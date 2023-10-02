export interface Course {
    id: string,
    name: string,
    description: string,
  }
  export interface CoursesResponse {
    courses: Course[];
    totalCount?: number; // Nova propriedade para indicar o total de cursos disponíveis
  }
 export interface Courses {
    uuid: string,
    name: string,
    author: string,
    description: string,
    body: string,
}