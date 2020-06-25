export function partition(arr) {
    let pivot = arr[arr.length - 1];
    let left = 0;
    let right = arr.length - 2;
    while (left <= right) {
        if (arr[left] > pivot && arr[right] < pivot) {
            swap(arr, left, right);
            left++;
            right--;
        } else if (arr[left] <= pivot) left++;
        else right--;
    }
    swap(arr, left, arr.length - 1);
    return left;
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}